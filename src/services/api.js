
let config = {};
let serviceBase = '';

/**
 * Read the config by getting the script path as the service base url.
 * Use this for api calls inc getting the cust config.
 * @param {} customer 
 * @returns 
 */
export const getConfig = async (customer) => {

  const FAIL = 'Could not load the Beacon App. Check customer config.';
  try {
    const src = document.querySelector('#beacon-app-scriptastic')?.src;
    serviceBase = src.match(/http[s]?:\/\/.+?\//gm)[0];

    // load from local server in dev mode. 
    if (import.meta.env?.MODE === 'development') {
      serviceBase = 'http://localhost:3000/';
    }

    const res = await fetch(`${serviceBase}api/config/${customer}`);
    if (res.status === 200) {
      const data = await res.json();
      config = data;
      return data;
    }
  } catch {
    //
  }
  console.error(FAIL);
  return null;
}

/**
 * Send contact data
 * @param {*} param0 
 * @returns 
 */
export const sendContact = async ({email, name, message, token}) => {
  
  const emailTo = config?.contact?.contact;

  if (token && serviceBase) {

    // call contact with token
    const res = await fetch(`${serviceBase}api/contact`, {
      method: 'POST',
      body: JSON.stringify({
        emailTo,
        email,
        name,
        message, 
        token
      })
    });

    return (res.status == 200);

  } else {
    console.log('Could not validate captcha');
  }

  return false;
}