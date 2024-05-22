import { Form } from "react-bootstrap";
const giftsData = {
  company: {
    label: "seclectioner le pack qui vous intersse le plus ",
    options: ["pack1", "pack2", "pack3", "pack4"],
  },
  public_establishmentAndStudent: {
    label:
      "Sélectionner la thème de formation qui vous intéresse le plus pour participer à un webinaire gratuit:",
    options: [
      " Principes de base du Cloud Microsoft Azure (AZ 900)",
      "Fondamentaux de l'intelligence artificielle (Al 900)",
      "Principes de base de la Power Platform (PL 900)",
      "Fondamentaux des données (DP 900)",
    ],
  },
};
export const getProfileGifts = (profile, errors , register) => {
  if (profile === "company") {
    return (
      <Form.Group className="col mb-3" controlId="formBasicEmail">
        <Form.Label>gifts</Form.Label>
        <Form.Select
          className={`${errors?.gifts && "error"}`}
          type="text"
          placeholder="Enter gifts"
          name="gifts"
          {...register("gifts", {
            required: "the gifts is required",
            validate:(field)=>{
              return field !== giftsData?.company?.label || "gifts field is required !"
            }
          })}
        >
          <option value={giftsData?.company?.label} selected disabled>
            {giftsData?.company?.label}
          </option>
          {giftsData?.company?.options.map((opt, index) => (
            <option value={opt} key={index}>
              {opt}
            </option>
          ))}
        </Form.Select>
        <p className="text-danger mt-1">{errors && errors["gifts"]?.message}</p>
      </Form.Group>
    );
  } else if (profile === "public_establishment" || profile === "student") {
    return (
      <Form.Group className="col mb-3" controlId="formBasicEmail">
        <Form.Label>gifts</Form.Label>
        <Form.Select
          className={`${errors?.gifts && "error"}`}
          type="text"
          placeholder="Enter gifts"
          name="gifts"
          {...register("gifts", {
            required: "the gifts is required",
            validate:(field)=>{
              return field !== giftsData?.public_establishmentAndStudent?.label || "gifts field is required !"
            }
          })}
        >
          <option value={giftsData?.public_establishmentAndStudent?.label} selected disabled>
            {giftsData?.public_establishmentAndStudent?.label}
          </option>
          {giftsData?.public_establishmentAndStudent?.options.map((opt, index) => (
            <option value={opt} key={index}>
              {opt}
            </option>
          ))}
        </Form.Select>
        <p className="text-danger mt-1">{errors && errors["gifts"]?.message}</p>
      </Form.Group>
    );
  }
};
