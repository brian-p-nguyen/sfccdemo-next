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
        nacelleEntryIds: [
            "aWQ6Ly9DT05URU5URlVML2lvam05MXU0ZXo1Yy9tYXN0ZXIvQ09OVEVOVC83SmtVcTVHc3ZCM2ZVU1ZtMGpjcmVHL2VuLVVT",
        ],
    });
    console.log("content", content);
    return { props: content?.[0] || {} };
}
