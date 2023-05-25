
let config = {};
let serviceBase = '';

/**
 * Read the site config by getting the script path as the service base url.
 * Use this for api calls inc getting the cust config.
 * @param {} customer 
 * @returns 
 */
export const getSiteConfig = async (siteId) => {

  const FAIL = 'Could not load the App. Check customer config.';
  try {
    const src = document.querySelector('#infochat-app-scriptastic')?.src;
    serviceBase = src.match(/http[s]?:\/\/.+?\//gm)[0];

    // load from local server in dev mode. 
    if (import.meta.env?.MODE === 'development') {
      serviceBase = 'http://localhost:3000/';
    }

    const res = await fetch(`${serviceBase}api/site/${siteId}`);
    if (res.status === 200) {
      const resJson = await res.json();
      config = resJson.data;
      return resJson;
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
export const sendContact = async ({section, token, contactInfo}) => {
  
  if (token && serviceBase) {

    const formbody = {
      section, 
      token,
      ...contactInfo
    }
    
    // call contact with token
    const res = await fetch(`${serviceBase}api/contact/${config.customerId}`, {
      method: 'POST',
      body: JSON.stringify(formbody)
    });

    return (res.status == 200);

  } else {
    console.log('Could not validate captcha');
  }

  return false;
}
