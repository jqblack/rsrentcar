export const post = async (url,data) => {
    try {
      let response = await fetch(
        url,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      );
   const json = await response.json();
      console.log(provincias1)
  return json;
     
    } catch (error) {
      console.error(error);
    }
  };

