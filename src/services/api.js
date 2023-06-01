
let config = {};

/**
 * Read the site config by getting the script path as the service base url.
 * Use this for api calls inc getting the cust config.
 * @param {} customer 
 * @returns 
 */
export const getSiteConfig = async (siteId) => {

  const FAIL = 'Could not load the site.  Did you publish it??';
  try {

    const res = await fetch(`https://info-beacon-1.nyc3.digitaloceanspaces.com/sites/${siteId}.json`);
    if (res.status === 200) {
      config = await res.json();
      return config;
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
  
  if (token) {

    const formbody = {
      section, 
      token,
      ...contactInfo
    }
  
    // call contact with token
    const res = await fetch(`${getServiceBase()}api/contact/${config._id}`, {
      method: 'POST',
      body: JSON.stringify(formbody)
    });

    return (res.status == 200);

  } else {
    console.log('Could not validate captcha');
  }

  return false;
}

const getServiceBase = () => {
  // calc serviceBase. Needed because the api calls are to the same
  // url the app web component was loaded from.
  if (import.meta.env?.MODE === 'development') {
    return 'http://localhost:3000/';
  } else {
    const src = document.querySelector('#infochat-app-scriptastic')?.src;
    return src.match(/http[s]?:\/\/.+?\//gm)[0];  
  }
}