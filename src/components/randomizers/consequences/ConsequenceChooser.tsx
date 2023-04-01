import { useState, useEffect, ChangeEvent } from "react";
import {
  Consequence,
  ConsequenceSeverity,
  setRandomConsequence,
  getPresetArray,
  getConsequenceDifficulty,
  BaseComponentProps,
  getLocalStorageData,
  Preset,
  addPreset,
} from "../../../utils";
import Header from "../../Header";
import ConsequenceCreator from "./ConsequenceCreator";

export default function ConsequenceChooser({
  isDarkMode,
}: BaseComponentProps): JSX.Element {
  const severities: ConsequenceSeverity[] = ["low", "medium", "high"];
  const [items, setItems] = useState<Consequence[]>(
    getLocalStorageData<Consequence[]>("userPreset", [])
  );
  const [userPresets, setUserPresets] = useState<Preset[]>(
    getLocalStorageData<Preset[]>("userPresets", getPresetArray())
  );
  const [oldItems, setOldItems] = useState<Consequence[]>([]);
  const [selectedConsequence, setSelectedConsequence] =
    useState<Consequence | null>(null);

  useEffect(() => {
    localStorage.setItem("userPreset", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("userPresets", JSON.stringify(userPresets));
  }, [userPresets]);

  function handlePresetChange(event: ChangeEvent<HTMLSelectElement>): void {
    const selected = event.target.selectedIndex;

    // 0 would be the "None" option here, so set the items to an empty array.
    if (selected === 0) setItems([]);
    else setItems(userPresets[selected - 1]?.consequences || []);
  }

  function removeItem(index: number): void {
    const itemToRemove = items[index];
    const shouldRemove = confirm(
      `Are you sure you want to remove "${itemToRemove.name}"? This cannot be undone!`
    );
    if (shouldRemove) {
      const newItems = [...items];
      setItems(newItems.filter((_, itemIndex) => itemIndex !== index));
    }
  }

  function removeAll(): void {
    const shouldRemove = confirm("Are you sure? You will lose all changes!");
    if (shouldRemove) setItems([]);
  }

  function resetComp(): void {
    const shouldRemove = confirm("Are you sure? You will lose all changes!");
    if (shouldRemove) {
      setItems([]);
      setOldItems([]);
      setSelectedConsequence(null);
    }
  }

  function handleFilter(event: ChangeEvent<HTMLSelectElement>): void {
    const selected = event.target.selectedIndex;

    // 0 would be the "None" option here, so set the items back to the old array.
    if (selected === 0) setItems(oldItems);
    else {
      const severity = severities[selected - 1];
      if (oldItems.length > 0) {
        setItems(oldItems.filter((item) => item.severity === severity));
      } else {
        setOldItems([...items]);
        setItems(items.filter((item) => item.severity === severity));
      }
    }
  }

  function savePreset(): void {
    let presetName = prompt("What name should your preset be saved as?");

    if (presetName && presetName.length > 0) {
      setUserPresets([...userPresets, addPreset(presetName, items)]);
      alert(`Preset saved with name: "${presetName}"`);
    } else alert("Preset name invalid, preset not saved.");
  }

  return (
    <div>
      <Header
        title="Challenge Chooser"
        description="Here you can manage and create challenges and have a random one selected!"
        className="mb-30px"
      />
      <a
        href="https://docs.google.com/document/d/1ztKALxr8LZ4tpxMpR0oBAiVkk0XNODlifXIzESp99Qk/edit?usp=sharing"
        className="description link m-5px"
        target="_blank"
        rel="noreferrer noopener"
      >
        All Rules for preset challenges
      </a>
      {selectedConsequence && (
        <div className={`chosen ${isDarkMode ? "dark-mode" : "light-mode"}`}>
          <h2 className="legend-name">{selectedConsequence.name}</h2>
          <h3 className="description">
            <b
              className={getConsequenceDifficulty(
                selectedConsequence.severity
              ).toLowerCase()}
            >
              {getConsequenceDifficulty(selectedConsequence.severity)}
            </b>{" "}
            Difficulty
          </h3>
          <h3 className="description">{selectedConsequence.description}</h3>
        </div>
      )}
      {items.length > 0 && (
        <div>
          <h2 className="big-text legend-type">Current Consequences</h2>
          <div className="mb-30px types wrap">
            {items.map((con, index) => {
              const difficulty = getConsequenceDifficulty(con.severity);
              return (
                <div className="type m-5px" key={index}>
                  <h2 className="legend-name">{con.name}</h2>
                  <b>------</b>
                  <h3 className="description">
                    <b className={difficulty.toLowerCase()}>
                      {getConsequenceDifficulty(con.severity)}
                    </b>{" "}
                    Difficulty
                  </h3>
                  <b>------</b>
                  <br />
                  <button
                    type="button"
                    className={`activator ${
                      isDarkMode ? "dark-mode" : "light-mode"
                    }`}
                    onClick={() => removeItem(index)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
          <div className="types">
            <button
              type="button"
              className={`type activator ${
                isDarkMode ? "dark-mode" : "light-mode"
              }`}
              onClick={() => savePreset()}
            >
              Save As Preset
            </button>
            <button
              type="button"
              className={`type activator ${
                isDarkMode ? "dark-mode" : "light-mode"
              }`}
              onClick={() => removeAll()}
            >
              Delete All
            </button>
            <button
              type="button"
              className={`type activator ${
                isDarkMode ? "dark-mode" : "light-mode"
              }`}
              onClick={resetComp}
            >
              Reset
            </button>
          </div>
        </div>
      )}
      <div
        className={`types form-container ${
          isDarkMode ? "dark-mode" : "light-mode"
        } mb-30px`}
      >
        <div className="type">
          <label htmlFor="preset" className="legend-type">
            Use a preset?
          </label>
          <br />
          <select title="Preset" onChange={handlePresetChange}>
            <option value="">None</option>
            {userPresets.map((preset, index) => {
              return (
                <option value={preset.name} key={index}>
                  {preset.name}
                </option>
              );
            })}
          </select>
        </div>
        <ConsequenceCreator
          consequences={items}
          setConsequences={setItems}
          setOldConsequences={setOldItems}
          severities={severities}
          isDarkMode={isDarkMode}
        />
        <div>
          <label htmlFor="filter" className="legend-type">
            Consequence Filter:{" "}
          </label>
          <select title="Consequence Filter" onChange={handleFilter}>
            <option value="">None</option>
            {severities.map((severity, index) => {
              return (
                <option value={severity} key={index}>
                  {getConsequenceDifficulty(severity)}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {items.length > 0 && (
        <button
          type="button"
          className={`activator ${isDarkMode ? "dark-mode" : "light-mode"}`}
          onClick={() => setRandomConsequence(items, setSelectedConsequence)}
        >
          Get Challenge
        </button>
      )}
    </div>
  );
}
