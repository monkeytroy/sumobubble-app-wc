
let config = {};
let serviceBase = '';

export const getConfig = async (customer) => {
  serviceBase = document.querySelector('#beacon-app-scriptastic').baseURI;
  debugger;
  const res = await fetch(`${serviceBase}${customer}.json`);
  const data = await res.json();
  config = data;
  return data;
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