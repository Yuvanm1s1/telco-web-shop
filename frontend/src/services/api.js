export const getNavItems = async () => {
    const response = await fetch(`https://dummyjson.com/c/10b3-a8b9-44e6-9b98`);
    const data = await response.json();
    return data;
}
