import { nacelleClient } from "services";
import DynamicComponent from "components/section/DynamicComponent";
import HeadComponent from "components/head/Head";

export default function Home(props) {
    return (
        <>
            <HeadComponent />
            <div>
                {props.fields?.sections.map(({ fields, type }, i) => (
                    <section key={i} className="bg-white" section={type}>
                        <DynamicComponent component={type} fields={fields} />
                    </section>
                ))}
                }
            </div>
        </>
    );
}

export async function getStaticProps({ params }) {
    // Performs a GraphQL query to Nacelle to get product data,
    // using the handle of the current page.
    // (https://nacelle.com/docs/querying-data/storefront-sdk)
    const content = await nacelleClient.content({
        handles: ["next-reference-store-homepage-magento"],
    });
    console.log("content", content);
    return { props: content?.[0] || {} };
}
