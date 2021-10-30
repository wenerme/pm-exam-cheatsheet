export interface Process {
  name: string;
  processCount;

  domain: string;
  group: string;

  in: ItemRef[];
  tt: ItemRef[];
  out: ItemRef[];
}

export interface Domain {
  name: string;
  processCount;
  启动: Process[];
  规划: Process[];
  执行: Process[];
  监控: Process[];
  收尾: Process[];
}

export interface ProcessGroup {
  name: string;
  processCount;
}

export interface ItemRef {
  name: string;
  rate?: number;
  html?;

  process: string; // used by process
  as: 'in' | 'out' | 'tt'; // used as
}

interface Item {
  name: string;
  refs: ItemRef[];
}

export interface Dataset {
  domains: Domain[];
  groups: ProcessGroup[];
  processes: Process[];
}
