import { ChangeEvent, useState, useEffect } from "react";
import {
  Consequence,
  ConsequenceSeverity,
  makeConsequence,
  BaseComponentProps,
  Setter,
} from "../../../utils/";
import TextInput from "../../TextInput";
import TextAreaInput from "../../TextAreaInput";
import SelectInput from "../../SelectInput";

interface ConsequenceCreatorProps extends BaseComponentProps {
  consequences: Consequence[];
  setConsequences: Setter<Consequence[]>;
  setOldConsequences: Setter<Consequence[]>;
  severities: ConsequenceSeverity[];
}

export default function ConsequenceCreator({
  consequences,
  isDarkMode,
  setConsequences,
  setOldConsequences,
  severities,
}: ConsequenceCreatorProps) {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [severity, setSeverity] = useState<ConsequenceSeverity>("low");
  const [description, setDescription] = useState(
    localStorage.getItem("description") || ""
  );

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem("description", description);
  }, [description]);

  function handleCreation(): void {
    if (name.length === 0 || description.length === 0) return;
    setConsequences([
      ...consequences,
      makeConsequence(name, description, severity),
    ]);
    setOldConsequences([]);
    setName("");
    setDescription("");
  }

  function handleSeverityChange(event: ChangeEvent<HTMLSelectElement>): void {
    const selected = event.target.selectedIndex;

    setSeverity(severities[selected]);
  }

  return (
    <form className="right">
      <h2 className="legend-type">New Consequence</h2>
      <div>
        <label htmlFor="name" className="legend-type">
          Name: <span className="required">* </span>
        </label>
        <TextInput
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Consequence Name"
          required
        />
      </div>
      <div>
        <label htmlFor="severity" className="legend-type">
          Difficulty: <span className="required">* </span>
        </label>
        <SelectInput
          title="Consequence Difficulty"
          onChange={handleSeverityChange}
          required
        >
          <option value="low">Easy</option>
          <option value="medium">Medium</option>
          <option value="high">Hard</option>
        </SelectInput>
      </div>
      <div>
        <label htmlFor="description" className="legend-type">
          Description: <span className="required">* </span>
        </label>
        <TextAreaInput
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Consequence Description"
          required
        />
      </div>
      <button
        type="submit"
        onClick={handleCreation}
        className={`activator ${isDarkMode ? "dark-mode" : "light-mode"}`}
      >
        Create
      </button>
    </form>
  );
}
