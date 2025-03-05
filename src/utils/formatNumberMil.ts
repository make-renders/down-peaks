
export interface formatNumberMilInterface {
  (number: number | undefined ): number| string | undefined;
}

export const formatNumberMil: formatNumberMilInterface = (number) => {
  if (number === undefined) {
    return 0
  };

  if (number < 1000) {
    return number
  };

  return number.toLocaleString("es-AR");
}