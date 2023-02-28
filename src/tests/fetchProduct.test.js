import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', async () => {
    await expect(typeof fetchProduct).toBe('function');
  });
  it('Execute a função fetchProduct com o argumento do produto "MLB1405519561" e teste se fetch foi chamada', async () => {
    const returned = await fetchProduct('MLB1405519561');
    return returned;
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamar a função fetchProduct com o argumento do produto "MLB1405519561", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1405519561"', async () => {
    const returned = await fetchProduct('MLB1405519561');
    return returned;
    expect(returned).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });
  it('Teste se o retorno da função fetchProduct com o argumento do produto "MLB1405519561" é uma estrutura de dados igual ao objeto produto que já está importado no arquivo.', async () => {
    const expected = await fetchProduct('MLB1405519561') 
    expect(expected).toEqual(product);
  });
  it("Ao chamar a função fetchProduct sem argumento, retorna um erro com a mensagem: 'ID não informado'", async () => {
    await expect(() => fetchProduct()).rejects.toThrow('ID não informado');
  });
});
