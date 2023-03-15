
let config = {};
let serviceBase = '';

export const getConfig = async (customer) => {
  try {
    const src = document.querySelector('#beacon-app-scriptastic')?.src;

    serviceBase = src.split('/').slice(0, -1).join('/') + '/';

    const res = await fetch(`${serviceBase}${customer}.json`);
    const data = await res.json();
    config = data;
    return data;
  } catch(err) {
    console.error('Could not load the Beacon App script.  Check your config');
    return null;
  }
}

export const sendContact = async ({email, name, message, token}) => {
  
  const emailTo = config?.contact?.contact;

  if (token && serviceBase) {

    // call contact with token
    const res = await fetch(`${serviceBase}/api/contact`, {
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