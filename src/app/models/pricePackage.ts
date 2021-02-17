export default interface PricePackage
{
    package_id: number;
    package_name: string;
    package_price: number;
    price_per_gigabyte: number;
    workspace_limit: number;
    user_limit: number;
}
