import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  BookOpen,
  MessageCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { interviews, Interview, Question } from "../data/interviews";
import "./InterviewViewer.css";

interface InterviewViewerProps {
  interviewId: string;
  onBack: () => void;
}

const InterviewViewer: React.FC<InterviewViewerProps> = ({
  interviewId,
  onBack,
}) => {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(
    new Set()
  );
  const [showAnswers, setShowAnswers] = useState(true);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(
    new Set()
  );

  const interview = interviews.find((i) => i.id === interviewId);

  if (!interview) {
    return (
      <div className="interview-not-found">
        <h2>Entrevista não encontrada</h2>
        <button onClick={onBack}>Voltar</button>
      </div>
    );
  }

  const handleQuestionToggle = (questionIndex: number) => {
    setExpandedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionIndex)) {
        newSet.delete(questionIndex);
      } else {
        newSet.add(questionIndex);
      }
      return newSet;
    });
    setCompletedQuestions((prev) => new Set([...prev, questionIndex]));
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case "question":
        return <MessageCircle size={16} />;
      case "answer":
        return <CheckCircle size={16} />;
      default:
        return <BookOpen size={16} />;
    }
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case "question":
        return "Pergunta";
      case "answer":
        return "Resposta";
      default:
        return "Feedback";
    }
  };

  const getAnswerForQuestion = (questionIndex: number) => {
    const questions = interview.questions;
    for (let i = questionIndex + 1; i < questions.length; i++) {
      if (questions[i].type === "answer") {
        return questions[i];
      }
    }
    return null;
  };

  const questionQuestions = interview.questions.filter(
    (q) => q.type === "question"
  );
  const completedCount = completedQuestions.size;
  const totalQuestions = questionQuestions.length;

  return (
    <div className="interview-viewer">
      <div className="viewer-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>

        <div className="interview-info">
          <h2>{interview.title}</h2>
          <p>{interview.description}</p>
        </div>

        <button
          className="toggle-answers-button"
          onClick={() => setShowAnswers(!showAnswers)}
        >
          {showAnswers ? <EyeOff size={20} /> : <Eye size={20} />}
          <span>{showAnswers ? "Ocultar" : "Mostrar"} Respostas</span>
        </button>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${(completedCount / totalQuestions) * 100}%`,
          }}
        />
        <span className="progress-text">
          {completedCount} de {totalQuestions} perguntas estudadas
        </span>
      </div>

      <div className="accordion-container">
        <div className="accordion-header">
          <h3>Perguntas da Entrevista</h3>
          <div className="accordion-stats">
            <span className="stats-item">
              <CheckCircle size={16} />
              {completedCount} completadas
            </span>
            <span className="stats-item">
              <BookOpen size={16} />
              {totalQuestions - completedCount} restantes
            </span>
          </div>
        </div>

        <div className="accordion-list">
          {interview.questions
            .filter((q) => q.type === "question")
            .map((question, index) => {
              const questionIndex = interview.questions.findIndex(
                (q) => q.id === question.id
              );
              const isExpanded = expandedQuestions.has(questionIndex);
              const isCompleted = completedQuestions.has(questionIndex);
              const answer = getAnswerForQuestion(questionIndex);

              return (
                <motion.div
                  key={question.id}
                  className={`accordion-item ${isCompleted ? "completed" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <button
                    className="accordion-trigger"
                    onClick={() => handleQuestionToggle(questionIndex)}
                    aria-expanded={isExpanded}
                  >
                    <div className="accordion-trigger-content">
                      <div className="question-info">
                        <div className="question-number">{index + 1}</div>
                        <div className="question-details">
                          <div className="question-type-badge">
                            {getQuestionTypeIcon(question.type)}
                            <span>{getQuestionTypeLabel(question.type)}</span>
                          </div>
                          {question.category && (
                            <span className="question-category">
                              {question.category}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="accordion-controls">
                        {isCompleted && (
                          <CheckCircle size={20} className="completed-icon" />
                        )}
                        {isExpanded ? (
                          <ChevronUp size={20} className="chevron-icon" />
                        ) : (
                          <ChevronDown size={20} className="chevron-icon" />
                        )}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="accordion-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="accordion-content-inner">
                          {/* Pergunta */}
                          <div className="question-card">
                            <div className="question-text">{question.text}</div>

                            {question.tags && question.tags.length > 0 && (
                              <div className="question-tags">
                                {question.tags.map((tag, tagIndex) => (
                                  <span key={tagIndex} className="tag">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Resposta */}
                          {answer && showAnswers && (
                            <motion.div
                              className="answer-card"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            >
                              <div className="answer-header">
                                <div className="answer-type-badge">
                                  {getQuestionTypeIcon(answer.type)}
                                  <span>
                                    {getQuestionTypeLabel(answer.type)}
                                  </span>
                                </div>
                                {answer.category && (
                                  <span className="answer-category-badge">
                                    {answer.category}
                                  </span>
                                )}
                              </div>

                              <div className="answer-text">{answer.text}</div>

                              {answer.tags && answer.tags.length > 0 && (
                                <div className="answer-tags">
                                  {answer.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="tag">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default InterviewViewer;
