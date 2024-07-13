export const fnExampleES = () => {
  console.log("hello from ECMA Script Module function");
};

export const catFactAPIExampleRequest = async () => {
  const url = "https://catfact.ninja/fact";
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
    },
  });

  console.log(await response.text());
  try {
  } catch (error) {
    console.log("Oops! Our API Request hit a snag: ", error);
  }
};
