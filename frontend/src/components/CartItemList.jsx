import CartItem from "./CartItem"
import useCartStore from "../../store/cartStore"


function CartItemList() {
  const { cartItems } = useCartStore();

  return (
    <ul className="list bg-base-100 shadow-md">
      {cartItems?.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  )
}

export default CartItemList
