
let config = {};

export const getConfig = async (customer) => {
  const res = await fetch(`./${customer}.json`);
  const data = await res.json();
  config = data;
  return data;
}

export const sendContact = async ({email, name, message, token}) => {
  
  const emailTo = config?.contact?.contact;

  if (token && config?.beacon?.serviceUrl) {

    // call contact with token
    const res = await fetch(config.beacon?.serviceUrl, {
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