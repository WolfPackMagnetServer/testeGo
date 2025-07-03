import React from "react";
import { motion } from "framer-motion";
import { Clock, Target, Users, Play, Search } from "lucide-react";
import { Interview } from "../data/interviews";
import "./InterviewList.css";

interface InterviewListProps {
  interviews: Interview[];
  onInterviewSelect: (interviewId: string) => void;
  showSearchResults?: boolean;
}

const InterviewList: React.FC<InterviewListProps> = ({
  interviews,
  onInterviewSelect,
  showSearchResults = false,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "#10b981";
      case "intermediate":
        return "#f59e0b";
      case "advanced":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "Iniciante";
      case "intermediate":
        return "Intermediário";
      case "advanced":
        return "Avançado";
      default:
        return difficulty;
    }
  };

  if (interviews.length === 0) {
    return (
      <motion.div
        className="no-results"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Search size={48} />
        <h3>Nenhuma entrevista encontrada</h3>
        <p>Tente ajustar seus filtros ou termos de busca</p>
      </motion.div>
    );
  }

  return (
    <div className="interview-list">
      {showSearchResults && (
        <motion.div
          className="search-results-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Resultados da busca</h3>
          <p>
            {interviews.length} entrevista{interviews.length !== 1 ? "s" : ""}{" "}
            encontrada{interviews.length !== 1 ? "s" : ""}
          </p>
        </motion.div>
      )}

      <div className="interviews-grid">
        {interviews.map((interview, index) => (
          <motion.div
            key={interview.id}
            className="interview-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onInterviewSelect(interview.id)}
          >
            <div className="card-header">
              <h3>{interview.title}</h3>
              <div
                className="difficulty-badge"
                style={{
                  backgroundColor: getDifficultyColor(interview.difficulty),
                }}
              >
                {getDifficultyLabel(interview.difficulty)}
              </div>
            </div>

            <p className="description">{interview.description}</p>

            <div className="card-meta">
              <div className="meta-item">
                <Clock size={16} />
                <span>{interview.estimatedTime}</span>
              </div>
              <div className="meta-item">
                <Target size={16} />
                <span>{interview.questions.length} perguntas</span>
              </div>
            </div>

            <div className="topics">
              {interview.topics.slice(0, 3).map((topic, topicIndex) => (
                <span key={topicIndex} className="topic-tag">
                  {topic}
                </span>
              ))}
              {interview.topics.length > 3 && (
                <span className="topic-tag more">
                  +{interview.topics.length - 3}
                </span>
              )}
            </div>

            <div className="card-actions">
              <button className="start-button">
                <Play size={16} />
                <span>Começar</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InterviewList;
