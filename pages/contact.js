import ContactForm from "components/contact/ContactForm";
import HeadComponent from "components/head/Head";
import DynamicComponent from "components/section/DynamicComponent";
import { nacelleClient } from "services";

export default function Contact(props) {
    return (
        <>
            <HeadComponent title={"Contact Us"} />
            <div>
                {props.fields.sections.map(({ fields, type }, i) => (
                    <DynamicComponent
                        key={i}
                        component={type}
                        fields={fields}
                    />
                ))}
                <ContactForm />
            </div>
        </>
    );
}
export async function getStaticProps() {
    // Performs a GraphQL query to Nacelle to get product data,
    // using the handle of the current page.
    // (https://nacelle.com/docs/querying-data/storefront-sdk)
    const content = await nacelleClient.content({
        handles: ["next-reference-store-contact"],
    });
    return { props: content[0] };
}
