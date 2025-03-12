export async function getConfigValue(key: string): Promise<string> {
    try {
      const response = await fetch('./config.json'); // Ensure correct path to the JSON file
      if (!response.ok) {
        throw new Error(`Failed to fetch JSON: ${response.statusText}`);
      }
  
      const config = await response.json();
      
      if (key in config) {
        return config[key];
      } else {
        throw new Error(`Key "${key}" does not exist in the configuration.`);
      }
    } catch (error) {
      console.log('ERROR');
      throw error;
    }
  }


  const MyFunction = (s: string) : string => 
  {

    return s;

  }
  export default MyFunction;