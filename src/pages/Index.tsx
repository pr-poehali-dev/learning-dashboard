import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [currentCard, setCurrentCard] = useState(0);

  const vocabularyWords = [
    {
      word: "Ephemeral",
      translation: "Эфемерный",
      definition: "Длящийся очень короткое время",
      difficulty: "hard",
    },
    {
      word: "Ubiquitous",
      translation: "Повсеместный",
      definition: "Присутствующий везде",
      difficulty: "medium",
    },
    {
      word: "Serendipity",
      translation: "Интуиция",
      definition: "Нахождение чего-то хорошего случайно",
      difficulty: "easy",
    },
    {
      word: "Pragmatic",
      translation: "Прагматичный",
      definition: "Практичный подход к делам",
      difficulty: "medium",
    },
  ];

  const stats = {
    wordsKnown: 1248,
    dueToday: 42,
    streak: 18,
    totalWords: 1650,
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <Icon name="Book" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Lexicon</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </Button>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
              ЮР
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="flex gap-2 mb-8">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Домашняя
          </Button>
          <Button variant="outline">Изучение</Button>
          <Button variant="outline">Повторение</Button>
          <Button variant="outline">Статистика</Button>
        </nav>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Icon name="Brain" size={16} className="text-blue-500" />
                Изучено слов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 mb-2">
                {stats.wordsKnown.toLocaleString()}
              </div>
              <Progress value={75} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-green-500" />К
                повторению
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 mb-2">
                {stats.dueToday}
              </div>
              <Progress value={30} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Icon name="Flame" size={16} className="text-orange-500" />
                Серия дней
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 mb-2">
                {stats.streak} дней
              </div>
              <Progress value={60} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Icon name="Target" size={16} className="text-purple-500" />
                Прогресс
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 mb-2">
                {Math.round((stats.wordsKnown / stats.totalWords) * 100)}%
              </div>
              <Progress value={75} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vocabulary Card */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-800">
                  Карточка слова
                </span>
                <Badge
                  className={getDifficultyColor(
                    vocabularyWords[currentCard].difficulty,
                  )}
                >
                  {vocabularyWords[currentCard].difficulty}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {vocabularyWords[currentCard].word}
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  {vocabularyWords[currentCard].translation}
                </p>
                <p className="text-gray-500">
                  {vocabularyWords[currentCard].definition}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() =>
                    setCurrentCard(
                      (prev) => (prev + 1) % vocabularyWords.length,
                    )
                  }
                >
                  <Icon name="Volume2" size={16} className="mr-2" />
                  Произношение
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    setCurrentCard(
                      (prev) => (prev + 1) % vocabularyWords.length,
                    )
                  }
                >
                  Следующее
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Words */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-800">
                  Последние слова
                </span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-4 bg-blue-500 rounded-full opacity-${100 - i * 20}`}
                    />
                  ))}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vocabularyWords.map((word, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{word.word}</p>
                      <p className="text-sm text-gray-600">
                        {word.translation}
                      </p>
                    </div>
                    <Badge className={getDifficultyColor(word.difficulty)}>
                      {word.difficulty}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-6 text-lg hover:scale-105 transition-transform duration-200">
            <Icon name="Plus" size={20} className="mr-2" />
            Добавить слово
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-6 text-lg hover:scale-105 transition-transform duration-200">
            <Icon name="RotateCcw" size={20} className="mr-2" />
            Начать повторение
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
