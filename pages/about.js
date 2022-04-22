import { nacelleClient } from "services";
import DynamicComponent from "components/section/DynamicComponent";
import HeadComponent from "components/head/Head";

export default function About(props) {
    return (
        <>
            <HeadComponent title={"About"} />
            <div>
                {props.fields.sections.map(({ fields, type }, i) => (
                    <DynamicComponent
                        key={i}
                        component={type}
                        fields={fields}
                    />
                ))}
            </div>
        </>
    );
}

export async function getStaticProps({ params }) {
    // Performs a GraphQL query to Nacelle to get product data,
    // using the handle of the current page.
    // (https://nacelle.com/docs/querying-data/storefront-sdk)
    const content = await nacelleClient.content({
        handles: ["next-reference-store-about-page"],
    });
    return { props: content[0] };
}
