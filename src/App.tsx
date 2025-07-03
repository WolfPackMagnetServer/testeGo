import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Play, Settings, Home, Search, Filter } from "lucide-react";
import { interviews, categories, tags } from "./data/interviews";
import InterviewList from "./components/InterviewList";
import InterviewViewer from "./components/InterviewViewer";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import "./App.css";

type View = "home" | "interview" | "search";

function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedInterview, setSelectedInterview] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredInterviews = interviews.filter((interview) => {
    const matchesSearch =
      interview.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.topics.some((topic) =>
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategories =
      selectedCategories.length === 0 ||
      interview.topics.some((topic) => selectedCategories.includes(topic));

    const matchesTags =
      selectedTags.length === 0 ||
      interview.questions.some((q) =>
        q.tags?.some((tag) => selectedTags.includes(tag))
      );

    return matchesSearch && matchesCategories && matchesTags;
  });

  const handleInterviewSelect = (interviewId: string) => {
    setSelectedInterview(interviewId);
    setCurrentView("interview");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedInterview(null);
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  const handleSearch = () => {
    setCurrentView("search");
  };

  return (
    <div className="app">
      <header className="header">
        <motion.div
          className="header-content"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="logo" onClick={handleBackToHome}>
            <BookOpen size={32} />
            <h1>Estudo Go</h1>
          </div>

          <nav className="nav">
            <button
              className={`nav-button ${currentView === "home" ? "active" : ""}`}
              onClick={handleBackToHome}
            >
              <Home size={20} />
              <span>Início</span>
            </button>

            <button
              className={`nav-button ${
                currentView === "search" ? "active" : ""
              }`}
              onClick={handleSearch}
            >
              <Search size={20} />
              <span>Buscar</span>
            </button>

            <button
              className="nav-button filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
              <span>Filtros</span>
            </button>
          </nav>
        </motion.div>
      </header>

      <main className="main">
        <AnimatePresence mode="wait">
          {currentView === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="home-view"
            >
              <div className="hero-section">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Sistema de Estudo Interativo
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Explore entrevistas técnicas de Go de forma interativa e
                  aprenda com cenários reais
                </motion.p>
              </div>

              <InterviewList
                interviews={filteredInterviews}
                onInterviewSelect={handleInterviewSelect}
              />
            </motion.div>
          )}

          {currentView === "interview" && selectedInterview && (
            <motion.div
              key="interview"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="interview-view"
            >
              <InterviewViewer
                interviewId={selectedInterview}
                onBack={handleBackToHome}
              />
            </motion.div>
          )}

          {currentView === "search" && (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="search-view"
            >
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Buscar por perguntas, respostas, tópicos..."
              />

              <InterviewList
                interviews={filteredInterviews}
                onInterviewSelect={handleInterviewSelect}
                showSearchResults={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="filter-panel-overlay"
          >
            <FilterPanel
              categories={categories}
              tags={tags}
              selectedCategories={selectedCategories}
              selectedTags={selectedTags}
              onCategoriesChange={setSelectedCategories}
              onTagsChange={setSelectedTags}
              onClose={() => setShowFilters(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
