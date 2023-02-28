export const fetchProduct = async (param) => {
  if (!param) throw new Error('ID não informado');
  const result = await fetch(`https://api.mercadolibre.com/items/${param}`)
    .then((response) => response.json())
    .then((data) => data);
  return result;
};

export const fetchProductsList = async (param) => {
  if (!param) { throw new Error('Termo de busca não informado'); }
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${param}`)
    .then((response) => response.json())
    .then((data) => data);
  return result.results;
};
