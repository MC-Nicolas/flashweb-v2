import React, { useState } from "react";
import styles from "./OpenAi.module.scss";
import Image from "next/image";
import OpenAiIcon from "@/assets/icons/open-ai.svg";
import NeumorphicModal from "../NeumorphicModal/NeumorphicModal";

type Props = {};

const OpenAiModal = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [domain, setDomain] = useState("");
  const [topic, setTopic] = useState("");

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Domain:", domain);
    console.log("Topic:", topic);
    // Send OpenAI GPT request with domain and topic
  };

  return (
    <>
      <div className={styles["open-ai-button"]}>
        <button
          className={styles["button"]}
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(!isModalOpen);
          }}
        >
          <Image src={OpenAiIcon} alt="open ai icon" />
        </button>
      </div>
      <NeumorphicModal />
      {isModalOpen && (
        <>
          <div className={styles["modal-overlay"]} />
          <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
              <h2>OpenAI GPT Request</h2>
              <form>
                <label>
                  Domain of expertise:
                  <input
                    type="text"
                    value={domain}
                    onChange={handleDomainChange}
                  />
                </label>
                <label>
                  Question topic:
                  <input
                    type="text"
                    value={topic}
                    onChange={handleTopicChange}
                  />
                </label>
                <button type="button" onClick={handleSubmit}>
                  Send
                </button>
              </form>
              <button
                className={styles["close-button"]}
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OpenAiModal;
