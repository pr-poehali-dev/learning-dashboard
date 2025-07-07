import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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
        return "bg-emerald-100 text-emerald-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "hard":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredWords = vocabularyWords.filter(
    (word) =>
      word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.translation.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Icon name="Book" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Lexicon</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </Button>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
              ЮР
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Icon
            name="Search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            placeholder="Поиск слов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-3 text-lg bg-white/80 backdrop-blur-sm border-purple-200 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in hover:scale-105">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Icon name="Brain" size={24} className="text-purple-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {stats.wordsKnown.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Изучено слов</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in hover:scale-105">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Icon name="Clock" size={24} className="text-pink-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {stats.dueToday}
                  </div>
                  <div className="text-sm text-gray-600">К повторению</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in hover:scale-105">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Icon name="Flame" size={24} className="text-orange-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {stats.streak} дней
                  </div>
                  <div className="text-sm text-gray-600">Серия дней</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-emerald-200 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in hover:scale-105">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Icon name="Target" size={24} className="text-emerald-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {Math.round((stats.wordsKnown / stats.totalWords) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Прогресс</div>
                </div>
              </div>
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
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
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
                {(searchTerm ? filteredWords : vocabularyWords).map(
                  (word, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-colors cursor-pointer"
                      onClick={() =>
                        setCurrentCard(vocabularyWords.indexOf(word))
                      }
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
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg hover:scale-105 transition-transform duration-200">
            <Icon name="Plus" size={20} className="mr-2" />
            Добавить слово
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white py-6 text-lg hover:scale-105 transition-transform duration-200">
            <Icon name="RotateCcw" size={20} className="mr-2" />
            Начать повторение
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
