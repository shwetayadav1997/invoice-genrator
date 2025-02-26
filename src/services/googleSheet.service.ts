export const addRow = async (quotationData: any) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    if (!url) {
      throw new Error("VITE_BACKEND_URL is not defined");
    }
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quotationData,
      }),
    });
    const data = await response.json();
    return data;
  };