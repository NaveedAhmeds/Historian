import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Form, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";

export default function AdvancedSearch() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  // made it async...
  async function submitForm(data) {
    let queryString = `searchBy=${data.searchBy}`;

    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;

    queryString += `&isOnView=${data.isOnView ? "true" : "false"}`;
    queryString += `&isHighlight=${data.isHighlight ? "true" : "false"}`;
    queryString += `&q=${encodeURIComponent(data.q)}`;

    // SETTING THE Historyyyyyy...
    setSearchHistory(await addToHistory(queryString));

    router.push(`/artwork?${queryString}`);
  }

  return (
    <>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group className="mb-3">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            type="text"
            {...register("q", { required: true })}
            className={errors.q ? "is-invalid" : ""}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Search By</Form.Label>
          <Form.Select {...register("searchBy")}>
            <option value="title">Title</option>
            <option value="tags">Tags</option>
            <option value="artistOrCulture">Artist or Culture</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Geo Location</Form.Label>
          <Form.Control type="text" {...register("geoLocation")} />
          <Form.Text className="text-muted">
            Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New
            York&quot;, etc.), with multiple values separated by the | operator
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Medium</Form.Label>
          <Form.Control type="text" {...register("medium")} />
          <Form.Text className="text-muted">
            Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;,
            &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by
            the | operator
          </Form.Text>
        </Form.Group>

        <Form.Check
          type="checkbox"
          label="Highlighted"
          {...register("isHighlight")}
          className="mb-3"
        />

        <Form.Check
          type="checkbox"
          label="Currently on View"
          {...register("isOnView")}
          className="mb-3"
        />

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </>
  );
}
