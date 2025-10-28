import { AIRTABLE_TOKEN, BASE_ID, TABLE_NAME } from './env.js';

document.addEventListener('DOMContentLoaded', () => {


  function getCodeProductFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('code');
  }

  const productCode = getCodeProductFromURL();
  console.log('Product code from URL:', productCode);

  async function getProductDetail(code) {
    // aca llamara a airtable para obtener el detalle del producto
  }
});