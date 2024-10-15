const commutesPerYear = 260 * 2;
const litresPerKM = 10 / 100;
const gasLitreCost = 1.5;
const litreCostKM = litresPerKM * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;

type DistanceProps = {
     leg: google.maps.DirectionsLeg;
};

const DIstance = ({ leg }: DistanceProps) => {
     return (
          <div>DIstance</div>
     )
}

export default DIstance