import { formatCurrency } from "../helpers";
import { deleteProduct } from "../services/ProductService";
import { Product } from "../types";
import { useNavigate, Form, ActionFunctionArgs,redirect, useFetcher } from "react-router-dom";
type ProductDetailsProp = {
  product: Product;
};

export async function action({params}:ActionFunctionArgs) {
    if(params.id === undefined) return;
    await deleteProduct(+params.id);
    return redirect("/");
}

const ProductDetails = ({ product }: ProductDetailsProp) => {
  const isAvailable = product.availability;
  const fetcher = useFetcher();
  const navigate = useNavigate();

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST"> 
            <button 
            
            type="submit"
            name="id"
            value={product.id}
            className={`${isAvailable ? "text-black" : "text-red-600"} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black' cursor-pointer`}
            >{isAvailable ? 
            "Disponible" : "No disponible"}</button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`/productos/${product.id}/editar`)}
            type="button"
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          >
            Editar
          </button>

          <Form method="POST" action={`productos/${product.id}/eliminar`} onSubmit={(e) => {
            if(!confirm("Dese eliminar este producto?")){
                e.preventDefault();
            }
          } }>
            <input className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer" type="submit" value="Eliminar" />
          </Form>
        </div>
      </td>
    </tr>
  );
};

export default ProductDetails;
