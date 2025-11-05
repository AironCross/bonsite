export interface Module {
  id: string;
  nameKey: string;
  descriptionKey: string;
  basePrice: number;
  pricePerUser: number;
  icon: string;
}

export const modules: Module[] = [
  {
    id: 'hr',
    nameKey: 'modules.hr.name',
    descriptionKey: 'modules.hr.description',
    basePrice: 50000,
    pricePerUser: 500,
    icon: 'Users',
  },
  {
    id: 'access',
    nameKey: 'modules.access.name',
    descriptionKey: 'modules.access.description',
    basePrice: 40000,
    pricePerUser: 300,
    icon: 'KeyRound',
  },
  {
    id: 'gate',
    nameKey: 'modules.gate.name',
    descriptionKey: 'modules.gate.description',
    basePrice: 60000,
    pricePerUser: 200,
    icon: 'Truck',
  },
  {
    id: 'visitor',
    nameKey: 'modules.visitor.name',
    descriptionKey: 'modules.visitor.description',
    basePrice: 35000,
    pricePerUser: 250,
    icon: 'UserCheck',
  },
  {
    id: 'report',
    nameKey: 'modules.report.name',
    descriptionKey: 'modules.report.description',
    basePrice: 45000,
    pricePerUser: 400,
    icon: 'BarChart3',
  },
  {
    id: 'safety',
    nameKey: 'modules.safety.name',
    descriptionKey: 'modules.safety.description',
    basePrice: 40000,
    pricePerUser: 350,
    icon: 'ShieldCheck',
  },
  {
    id: 'training',
    nameKey: 'modules.training.name',
    descriptionKey: 'modules.training.description',
    basePrice: 50000,
    pricePerUser: 450,
    icon: 'GraduationCap',
  },
  {
    id: 'portal',
    nameKey: 'modules.portal.name',
    descriptionKey: 'modules.portal.description',
    basePrice: 55000,
    pricePerUser: 300,
    icon: 'Globe',
  },
];

export function calculatePrice(selectedModules: string[], userCount: number): number {
  let totalPrice = 0;

  selectedModules.forEach((moduleId) => {
    const module = modules.find((m) => m.id === moduleId);
    if (module) {
      totalPrice += module.basePrice + module.pricePerUser * userCount;
    }
  });

  return totalPrice;
}

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}
