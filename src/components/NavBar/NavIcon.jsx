"use client";
import { useState, useEffect, useRef, useContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineManageAccounts } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsFillTrashFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { Context } from "../context";
import Link from "next/link";
import style from "./page.module.css";
import Image from "next/image";
import Profile from "@/assets/nav/profile.jpg";
import imgloading from "@/assets/product/CartLoading.svg";
import itsDarkIcon from "@/assets/nav/loading.svg";
import dynamic from "next/dynamic";
const IsItDark = dynamic(() => import("../Prop/IsItDark"), { ssr: false });
const Btn = dynamic(() => import("../Prop/CartBtn"), { ssr: false });

export default function NavIcon() {
  const { data: session } = useSession();
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [isWishlistOpen, setWishlistOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const wishlistRef = useRef(null);
  const cartRef = useRef(null);

  let cartData =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("cart_data"));
  const {
    wishlistItem,
    removeWishlistItem,
    cartEffect,
    setCartData,
    cartDataReset,
    setCartDataReset,
    loadingTimer,
    setLoadingTimer,
  } = useContext(Context);
  const CartID =
    typeof localStorage !== "undefined" && localStorage.getItem("cart_id");

  const toggleSubMenu = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  const toggleWishlist = () => {
    setWishlistOpen(!isWishlistOpen);
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  useEffect(() => {
    if (isWishlistOpen) {
      const closeWishlistOnClickOutside = (e) => {
        if (wishlistRef.current && !wishlistRef.current.contains(e.target)) {
          setWishlistOpen(false);
        }
      };

      document.addEventListener("mousedown", closeWishlistOnClickOutside);

      return () => {
        document.removeEventListener("mousedown", closeWishlistOnClickOutside);
      };
    }
  }, [isWishlistOpen]);

  useEffect(() => {
    if (isCartOpen) {
      const closeCartOnClickOutside = (e) => {
        if (cartRef.current && !cartRef.current.contains(e.target)) {
          setCartOpen(false);
        }
      };

      document.addEventListener("mousedown", closeCartOnClickOutside);

      return () => {
        document.removeEventListener("mousedown", closeCartOnClickOutside);
      };
    }
  }, [isCartOpen]);

  useEffect(() => {
    const closeSubMenuOnClickOutside = (e) => {
      if (isSubMenuOpen && !e.target.closest(`.${style.subMenu}`)) {
        setSubMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeSubMenuOnClickOutside);

    return () => {
      document.removeEventListener("mousedown", closeSubMenuOnClickOutside);
    };
  }, [isSubMenuOpen]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (CartID) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND}/store/carts/${CartID}`,
            {
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const { cart } = await response.json();

          setCartData(cart);
          setCustomer(cart.customer_id);
          if (cartEffect !== 0) {
            localStorage.setItem("cart_data", JSON.stringify(cart));
          }
        } else {
          console.log("No 'CartID' found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching or storing cart data:", error);
      }
    };

    fetchCartData();
  }, [CartID, setCartData, cartEffect]);

  const handleRemoveCartItem = (cartItemId) => {
    const removeCartItem = async () => {
      try {
        if (CartID) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND}/store/carts/${CartID}/line-items/${cartItemId}`,
            {
              method: "DELETE",
              credentials: "include",
            }
          );

          if (response.ok) {
            const updatedCartItems = cartData.items.filter(
              (item) => item.id !== cartItemId
            );

            const updatedCartData = { ...cartData, items: updatedCartItems };
            setCartData(updatedCartData);

            localStorage.setItem("cart_data", JSON.stringify(updatedCartData));
          } else {
            console.error("Failed to remove cart item:", response.status);
          }
        } else {
          console.error("No 'CartID' found in localStorage");
        }
      } catch (error) {
        console.error("Error removing cart item:", error);
      }
    };

    removeCartItem();
  };

  useEffect(() => {
    if (session && cartData && cartData.length > 0) {
      if (session.id !== cartData[0].customer_id) {
        setCartData(null);
        localStorage.setItem("cart_data", JSON.stringify(null));
      }
    }
    if (cartDataReset !== 0) {
      setCartData(null);
      localStorage.setItem("cart_data", JSON.stringify(null));
      setCartDataReset(0);
    }
  }, [session, cartDataReset, cartData, setCartData, setCartDataReset]);
  // useEffect(() => {
  //   if (cartDataReset !== 0) {
  //     setCartData(null);
  //     localStorage.setItem("cart_data", JSON.stringify(null));
  //     setCartDataReset(0);
  //   }
  // }, [cartDataReset]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading((prev) => !prev);
    }, 5000);

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoadingTimer((prev) => !prev);
    }, 3000);

    return () => clearTimeout(timerId); // Cleanup function to clear the timer when component unmounts or when the effect re-runs
  }, []);

  return (
    <div className={style.icons}>
      {session ? (
        <span className={style.wishlistlength}>{wishlistItem.length}</span>
      ) : null}
      {loadingTimer ? (
        <Image
          className={style.loadingivv}
          src={itsDarkIcon}
          alt=""
          height={60}
        />
      ) : (
        <IsItDark className={style.ItsDarkivv} />
      )}

      <AiOutlineHeart className={style.ivv} onClick={toggleWishlist} />
      <div
        ref={wishlistRef}
        className={`${style.wishlist} ${
          isWishlistOpen ? style.showWishlist : style.hideWishlist
        }`}
      >
        <IoMdArrowRoundBack
          onClick={toggleWishlist}
          className={style.ivvBack}
        />
        <h3 className={style.CWtitle}>Wishlist Items</h3>
        <hr className={style.CWhr} />
        {session ? (
          <>
            {wishlistItem && wishlistItem.length > 0 ? (
              wishlistItem.map((responseData) => (
                <div className={style.WishlistItem} key={responseData.id}>
                  <Image
                    src={responseData.thumbnail}
                    width={180}
                    height={200}
                    alt=""
                    style={{ borderRadius: "5px" }}
                  />
                  <div className={style.wdata}>
                    <h2>{responseData.title}</h2>
                    <p>{responseData.description}</p>
                    <span className={style.QtyPrice}>
                      Price: {getPriceInDZD(responseData)} DZD
                    </span>
                    <BsFillTrashFill
                      className={style.trash}
                      onClick={() => removeWishlistItem(responseData.id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className={style.empty}>Empty Wishlist</p>
            )}
          </>
        ) : (
          <p className={style.empty}>Sign In for Wishlist .</p>
        )}
      </div>
      <AiOutlineShoppingCart className={style.ivv} onClick={toggleCart} />
      <div
        ref={cartRef}
        className={`${style.cart} ${
          isCartOpen ? style.showcart : style.hidecart
        }`}
      >
        <IoMdArrowRoundBack onClick={toggleCart} className={style.ivvBack} />
        <h1 className={style.CWtitle}>Shopping Cart</h1>
        <hr className={style.CWhr} />
        {session ? (
          cartData ? (
            <div>
              {session.id.startsWith("cus") ? (
                cartData.customer_id === session.id ? (
                  <div>
                    {cartData.items.length > 0 ? (
                      cartData.items.map((item, itemIndex) => (
                        <div className={style.CartItem} key={itemIndex}>
                          <div>
                            <section>
                              <Image
                                src={item.thumbnail}
                                width={180}
                                height={200}
                                alt=""
                                style={{ borderRadius: "5px" }}
                              />
                              <h6 className={style.carttitle}>{item.title}</h6>
                              <h6 className={style.cartVariant}>
                                {item.description}
                              </h6>
                              <h6 className={style.QtyPrice}>
                                {item.quantity} X <span>{item.subtotal}</span>{" "}
                                DZA
                              </h6>
                            </section>
                            {loading ? (
                              <div className={style.imgcontainer}>
                                <Image
                                  className={style.loading}
                                  src={imgloading}
                                  width={90}
                                  height={90}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <BsFillTrashFill
                                className={style.Ctrash}
                                onClick={() => {
                                  handleRemoveCartItem(item.id);
                                  setLoading(true);
                                }}
                              />
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className={style.empty}>No items in this cart</p>
                    )}
                  </div>
                ) : (
                  <p className={style.empty}>Your cart is empty.</p>
                )
              ) : session.email === cartData.email ? (
                <div>
                  {cartData.items.length > 0 ? (
                    cartData.items.map((item, itemIndex) => (
                      <div className={style.CartItem} key={itemIndex}>
                        <div>
                          <section>
                            <Image
                              src={item.thumbnail}
                              width={180}
                              height={200}
                              alt=""
                              style={{ borderRadius: "5px" }}
                            />
                            <h6 className={style.carttitle}>{item.title}</h6>
                            <h6 className={style.cartVariant}>
                              {item.description}
                            </h6>
                            <h6 className={style.QtyPrice}>
                              {item.quantity} X <span>{item.subtotal}</span> DZA
                            </h6>
                          </section>

                          <BsFillTrashFill
                            className={style.Ctrash}
                            onClick={() => {
                              removeWishlistItem(responseData.id);
                            }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={style.empty}>No items in this cart</p>
                  )}
                </div>
              ) : (
                <p className={style.empty}>Your cart is empty.</p>
              )}
            </div>
          ) : (
            <p className={style.empty}>No data found.</p>
          )
        ) : (
          <p className={style.empty}>Sign in to view cart</p>
        )}
        {session ? (
          session.id.startsWith("cus") ? null : (
            <p className={style.warn}>
              Using Google and Github Limit You To One Item
            </p>
          )
        ) : null}
        <Btn />
      </div>
      {session ? (
        session.user.image ? (
          <Image
            className={style.ivv}
            onClick={toggleSubMenu}
            src={session.user.image}
            width={30}
            height={30}
            alt="User"
          />
        ) : (
          <MdOutlineManageAccounts
            className={style.ivv}
            onClick={toggleSubMenu}
          />
        )
      ) : (
        <>
          <MdOutlineManageAccounts
            className={style.ivv}
            onClick={toggleSubMenu}
          />
        </>
      )}
      {session ? (
        cartData ? (
          <>
            {session.id.startsWith("cus") ? (
              session.id === cartData.customer_id ? (
                cartData && cartData.items && cartData.items.length > 0 ? (
                  <span className={style.Cartlength}>
                    {cartData.items.length}
                  </span>
                ) : (
                  <span className={style.Cartlength}>0</span>
                )
              ) : (
                <span className={style.Cartlength}>0</span>
              )
            ) : session.email === cartData.email ? (
              cartData && cartData.items && cartData.items.length > 0 ? (
                <span className={style.Cartlength}>
                  {cartData.items.length}
                </span>
              ) : (
                <span className={style.Cartlength}>0</span>
              )
            ) : (
              <span className={style.Cartlength}>0</span>
            )}
          </>
        ) : null
      ) : null}

      {isSubMenuOpen && (
        <div className={style.subMenu}>
          {session ? (
            <>
              {session.user.image ? (
                <Image
                  className={style.Profile}
                  src={session.user.image}
                  width={60}
                  height={60}
                  alt="User"
                />
              ) : (
                <Image
                  className={style.Profile}
                  src={Profile}
                  width={60}
                  height={60}
                  alt="User"
                />
              )}
              <h4 className={style.title}>
                {session.user.name} {session.Last_name}
              </h4>
              <Link className={style.singOut} href="/api/auth/signout">
                Sign Out
              </Link>
              {session ? (
                session.id.startsWith("cus") ? (
                  <Link className={style.singOut} href="/api/auth/profile">
                    Update Profile
                  </Link>
                ) : (
                  <button disabled className={style.singOutDisabled}>
                    {" "}
                    Update Profile
                  </button>
                )
              ) : null}
            </>
          ) : (
            <p className={style.ntitle}>Login or register first!</p>
          )}
          {!session ? (
            <div className={style.sublink}>
              <Link className={style.login} href="/api/auth/signin">
                Login
              </Link>
              <Link className={style.login} href="/api/auth/Register">
                Register
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function getPriceInDZD(responseData) {
  const variants = responseData.variants;
  const dzdPrice = variants.map((variant) => {
    const dzdPriceData = variant.prices.find(
      (price) => price.currency_code === "dzd"
    );
    return dzdPriceData ? dzdPriceData.amount : "N/A";
  });

  return dzdPrice.length > 0 ? dzdPrice[0] : "N/A";
}
