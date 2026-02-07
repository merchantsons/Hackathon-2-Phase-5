import { AuthProvider, useAuth } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import { ToastProvider } from './context/ToastContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Landing } from './components/Landing/Landing';
import { Header } from './components/Header/Header';
import { TodoForm } from './components/TodoForm/TodoForm';
import { SearchBar } from './components/SearchBar/SearchBar';
import { FilterBar } from './components/FilterBar/FilterBar';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Chatbot } from './components/Chatbot/Chatbot';
import { ReminderChecker } from './components/ReminderChecker';
import styles from './App.module.css';

const TodoApp = () => {
  return (
    <TodoProvider>
      <ReminderChecker />
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.leftColumn}>
              <TodoForm />
              <SearchBar />
            </div>
            <div className={styles.rightColumn}>
              <FilterBar />
              <TodoList />
            </div>
          </div>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </TodoProvider>
  );
};

const AppContent = () => {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  return session ? <TodoApp /> : <Landing />;
};

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
