export const getAddress = async (cep) => {
  const cep1 = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const cep2 = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  const promisses = await [cep1, cep2];
  const returned = await Promise.any(promisses);
  const result = await returned.json();
  return result;
};

export const searchCep = async () => {
  const addres = document.querySelector('.cep-input').value;
  const cep = document.querySelector('.cart__address');
  const result = await getAddress(addres);
  const validate = [
    'cep',
    'address_type',
    'address_name',
    'address',
    'state',
    'district',
    'lat',
    'lng',
    'city',
    'city_ibge',
    'ddd',
  ];
  try {
    if (Object.keys(result).toString() === validate.toString()) {
      const { address, district, city, state } = result;
      if (!addres) { throw new Error('CEP não encontrado'); }
      cep.innerHTML = `${address} - ${district} - ${city} - ${state}`;
    } else {
      const { street, neighborhood, city, state } = result;
      if (!street) { throw new Error('CEP não encontrado'); }
      cep.innerHTML = `${street} - ${neighborhood} - ${city} - ${state}`;
    }
  } catch (error) {
    console.log(error);
    cep.innerHTML = error.message;
    return error;
  }
};
