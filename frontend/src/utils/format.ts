export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-MA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };
