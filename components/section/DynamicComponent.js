import FeaturedCollection from './FeaturedCollection';
import Hero from './Hero';
import OurTeam from './OurTeam';
import SideBySide from './SideBySide';
import RelatedProducts from './RelatedProducts';

// resolve Contentful component ids to Next.js components
const Components = {
  // Home
  heroBanner: Hero,
  sideBySide: SideBySide,
  collectionGrid: FeaturedCollection,
  ourTeam: OurTeam,
  relatedProducts: RelatedProducts
};

const DynamicComponent = ({ component, fields, ...otherProps }) => {
  // check if component is defined above
  if (typeof Components[component] !== 'undefined') {
    const Component = Components[component];
    return <Component fields={fields} otherProps={otherProps} />;
  }
  return (
    <p>
      The component <strong>{component}</strong> has not been created yet.
    </p>
  );
};

export default DynamicComponent;
