import _ from 'lodash';
import domainsRaw from './domains.yaml';
import processesRaw from './processes.yaml';
import { Dataset, Domain, Process, ProcessGroup } from './typing';

export const domainNames = [
  '整体管理',
  '范围管理',
  '时间管理',
  '成本管理',
  '质量管理',
  '人力管理',
  '沟通管理',
  '采购管理',
  '干系人管理',
];
export const groupNames = ['启动', '规划', '执行', '监控', '收尾'];
export const data = buildData();

function buildData() {
  const domains = domainsRaw as Domain[];
  const processes = domains.flatMap((d) => {
    return groupNames.flatMap((g) => {
      d[g]?.forEach((p) => {
        p.domain = d.name;
        p.group = g;
      });
      return d[g] ?? [];
    });
  }) as any as Process[];
  // const processes = groupNames.flatMap((g) => {
  //   return domains.flatMap((d) => {
  //     d[g]?.forEach((p) => {
  //       p.domain = d.name;
  //       p.group = g;
  //     });
  //     return d[g] ?? [];
  //   });
  // }) as Process[];

  const processRawByName = Object.fromEntries(processesRaw.map((v) => [v.name, v]));
  processes.forEach((v) => {
    Object.assign(v, processRawByName[v.name]);
  });

  const groups = groupNames.map((name) => ({ name, processCount: 0 })) as ProcessGroup[];
  const ds: Dataset = {
    domains: domains,
    groups: groups,
    processes,
    items: [],
    itemRefs: [],
    processByName: {},
  };

  for (const group of groups) {
    group.processes = processes.filter((v) => v.group === group.name);
    group.processCount = group.processes.length;
  }
  for (const domain of domains) {
    domain.processes = processes.filter((v) => v.domain === domain.name);
    domain.processCount = domain.processes.length;
  }
  for (const process of processes) {
    process.in.forEach((v) => {
      v.as = 'in';
      v.process = process.name;
    });
    process.out.forEach((v) => {
      v.as = 'out';
      v.process = process.name;
    });
    process.tt.forEach((v) => {
      v.as = 'tt';
      v.process = process.name;
    });
  }
  const refs = (ds.itemRefs = processes.flatMap((v) => [v.in, v.tt, v.out]).flat());
  for (const ref of refs) {
    const name = ref.name || ref.mid?.name || '';
    ref.id ||= `${ref.process}/${ref.as}/${name}`;
    ref.refId ||= name;
  }
  const items = (ds.items = Object.values(_.groupBy(refs, (v) => v.refId)).map((v) => {
    return {
      name: v[0].name,
      refs: v,
      as: v[0].as,
    };
  }));

  ds.processByName = Object.fromEntries(ds.processes.map((v) => [v.name, v]));
  window['data'] = ds;
  return ds;
}
