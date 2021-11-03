import _ from 'lodash';
import domainsRaw from './domains.yaml';
import ittoRaw from './itto.yaml';
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
    itto: [],
    ittoRef: [],
    processByName: {},
    ittoByName: {},
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
  const ittoRawByAbbr = _.keyBy(ittoRaw, 'abbr');
  const refs = (ds.ittoRef = processes.flatMap((v) => [v.in, v.tt, v.out]).flat());
  for (const ref of refs) {
    let name = ref.name || ref.mid?.name || '';
    // 替换 abbr 为 name
    name = ittoRawByAbbr[name]?.name || name;
    ref.name = name;
    ref.id ||= `${ref.process}/${ref.as}/${name}`;
    ref.refName ||= name;
    if (name.endsWith('更新') && !ref.updates) {
      ref.updates = Array.from(ref.updates ?? []).concat({ refName: name.substring(0, name.length - 2) } as any);
    }
  }

  const ittoRawByName = _.keyBy(ittoRaw, 'name');
  const items = (ds.itto = Object.values(_.groupBy(refs, 'refName')).map((v) => {
    const first = v[0];
    const found = ittoRawByName[first.refName];
    const as = _.uniqBy(v, 'as');
    return {
      name: first.name,
      refs: v,
      as: as.length == 1 ? as[0].as : 'io',
      updatedBy: [],
      ...found,
    };
  }));
  const ittoByName = _.keyBy(items, 'name');
  refs
    .filter((v) => v.updates)
    .forEach((v) => {
      v.updates?.map(({ refName }) => {
        return ittoByName[refName]?.updatedBy?.push(v) || console.warn('invalid ref', refName);
      });
    });

  ds.processByName = Object.fromEntries(ds.processes.map((v) => [v.name, v]));
  ds.ittoByName = ittoByName;
  window['data'] = ds;
  return ds;
}
