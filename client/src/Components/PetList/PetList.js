import { Logo } from "../../Constants/Images";
import "./PetList.css";

const PetList = () => {
  const sampleList = [
    {
      img: Logo,
      name: "hi",
      id: 1,
    },
    {
      img: Logo,
      name: "mi",
      id: 2,
    },
    {
      img: Logo,
      name: "ti",
      id: 3,
    },
    {
      img: Logo,
      name: "ki",
      id: 4,
    },
  ];
  return (
    <div className="pet-card-list-container">
      {sampleList.map((data) => {
        return (
          <div key={data.id}>
            <img src={data.img} alt="card" />
            {data.name}
          </div>
        );
      })}
    </div>
  );
};

export default PetList;
