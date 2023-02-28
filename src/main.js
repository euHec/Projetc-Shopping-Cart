import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import {
  createCustomElement,
  createProductElement,
  createCartProductElement,
  addPrice,
} from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

const products = document.querySelector('.products');
const ol = document.querySelector('.cart__products');

document.querySelector('.cep-button').addEventListener('click', searchCep);

const getProducts = async (param) => {
  const mError = 'Algum erro ocorreu, recarregue a página e tente novamente';
  products.appendChild(createCustomElement('h2', 'loading', 'Carregando'));
  const getLoading = document.querySelector('.loading');
  try {
    const result = await fetchProductsList(param);
    if (!result) throw new Error(mError);
    products.removeChild(getLoading);
    result.forEach((e) => {
      const newElement = createProductElement(e);
      products.appendChild(newElement);
    });
    return result;
  } catch (error) {
    products.appendChild(createCustomElement('h2', 'error', error.message));
  }
};

const getItensCart = async () => {
  const getItens = getSavedCartIDs();
  if (getItens) {
    const arr = getItens.map(async (e) => {
      addPrice(e);
      const returned = await fetchProduct(e);
      return returned;
    });
    const promisse = await Promise.all(arr);
    promisse.forEach((itens) => {
      const li = createCartProductElement(itens);
      ol.appendChild(li);
    });
    return arr;
  }
};

window.onload = () => {
  getProducts('computador');
  getItensCart();
};
