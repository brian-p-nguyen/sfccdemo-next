import { useCart, useCheckout } from "@nacelle/react-hooks";
import React, { useState, useEffect } from "react";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import SidebarCart from "components/header/SidebarCart";
import MobileMenu from "components/header/MobileMenu";
import SiteProvider from "context/SiteProvider";
import { nacelleClient } from "services";
import Newsletter from "components/footer/Newsletter";
// This component utilizes `useCart` and `useCheckout` hooks from
// `@nacelle/react-hooks` to clear cart and checkout data if the
// checkout is completed.
// https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks

function Layout({ children }) {
    const [, { clearCart }] = useCart();
    const [{ completed }, { clearCheckoutData }] = useCheckout();
    const [headerData, setHeaderData] = useState([]);
    const [footerData, setFooterData] = useState([]);
    const [socialData, setSocialData] = useState([]);
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        if (completed) {
            clearCheckoutData();
            clearCart();
        }
    }, [completed, clearCheckoutData, clearCart]);

    useEffect(() => {
        const query = `
      fragment NavigationItem on NavigationGroupItem {
        title
        url
        media {
          url
        }
      }
      query ($filter: NavigationFilterInput) {
        navigation(filter: $filter) {
          groupId
          title
          updatedAt
          updatedBy
          items {
            ...NavigationItem
            items {
              ...NavigationItem
              items {
                ...NavigationItem
                items {
                  ...NavigationItem
                  items {
                    ...NavigationItem
                  }
              }
            }
          }
        }
      }
    }
    `;
        nacelleClient.query({ query }).then(({ navigation }) => {
            setHeaderData(
                navigation.find((nav) => nav.groupId === "header").items
            );
            setFooterData(
                navigation.find((nav) => nav.groupId === "footer").items
            );
            setSocialData(
                navigation.find((nav) => nav.groupId === "social").items
            );
        });
        nacelleClient.products().then((res) => {
            console.log(res);
            setProductData(res);
        });
    }, []);
    return (
        <SiteProvider>
            <main>
                <Header productData={productData} headerData={headerData} />
                <MobileMenu productData={productData} headerData={headerData} />
                <SidebarCart />
                {React.cloneElement(children, { productData })}
                <Newsletter />
                <Footer footerData={footerData} socialData={socialData} />
            </main>
        </SiteProvider>
    );
}

export default Layout;
