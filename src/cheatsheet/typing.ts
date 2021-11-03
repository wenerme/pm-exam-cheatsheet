export interface Process {
  name: string;
  processCount;

  domain: string;
  group: string;

  in: IttoRef[];
  tt: IttoRef[];
  out: IttoRef[];
}

export interface Domain {
  name: string;
  processCount;
  启动: Process[];
  规划: Process[];
  执行: Process[];
  监控: Process[];
  收尾: Process[];

  processes: Process[];
}

export interface ProcessGroup {
  name: string;
  processes: Process[];
  processCount;
}

export interface IttoRef {
  id: string;
  refName: string;
  name: string;
  rate?: number;
  highlight?: string;
  mid?: IttoRef; // 中级
  updates?: Array<{ refName }>;

  process: string; // used by process
  as: 'in' | 'out' | 'tt'; // used as
}

export interface Itto {
  name: string;
  mid?: IttoRef;
  refs: IttoRef[];
  abbr?: string;
  updatedBy: IttoRef[];
  as: 'in' | 'out' | 'tt' | 'io';
}

export interface Dataset {
  domains: Domain[];
  groups: ProcessGroup[];
  processes: Process[];
  itto: Itto[];
  ittoRef: IttoRef[];

  processByName: Record<string, Process>;
  ittoByName: Record<string, Itto>;
}
