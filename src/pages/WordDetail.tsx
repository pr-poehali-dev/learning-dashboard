import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface WordDetailProps {
  word?: {
    word: string;
    translation: string;
    definition: string;
    difficulty: string;
    phonetic: string;
    partOfSpeech: string;
    examples: string[];
    synonyms: string[];
    antonyms: string[];
    etymology: string;
    frequency: number;
    lastReviewed: string;
    nextReview: string;
    correctAnswers: number;
    totalAttempts: number;
  };
  onBack: () => void;
}

const WordDetail = ({ word, onBack }: WordDetailProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Данные по умолчанию для демонстрации
  const defaultWord = {
    word: "Serendipity",
    translation: "Счастливая случайность",
    definition: "Способность делать приятные и неожиданные открытия случайно",
    difficulty: "medium",
    phonetic: "/ˌser.ənˈdɪp.ə.ti/",
    partOfSpeech: "noun",
    examples: [
      "It was pure serendipity that led me to find this amazing restaurant.",
      "The discovery of penicillin was a famous example of serendipity in science.",
      "Their meeting was a beautiful serendipity that changed both their lives.",
    ],
    synonyms: ["chance", "fortune", "luck", "coincidence"],
    antonyms: ["misfortune", "bad luck", "design", "intention"],
    etymology: 'From Persian fairy tale "The Three Princes of Serendip"',
    frequency: 85,
    lastReviewed: "2 дня назад",
    nextReview: "Завтра",
    correctAnswers: 8,
    totalAttempts: 10,
  };

  const currentWord = word || defaultWord;

  // Проверяем, что все необходимые поля существуют
  const safeWord = {
    ...currentWord,
    examples: currentWord.examples || [],
    synonyms: currentWord.synonyms || [],
    antonyms: currentWord.antonyms || [],
    etymology: currentWord.etymology || "Информация недоступна",
    phonetic: currentWord.phonetic || "/ˈwɜːrd/",
    partOfSpeech: currentWord.partOfSpeech || "word",
    frequency: currentWord.frequency || 50,
    lastReviewed: currentWord.lastReviewed || "Не изучалось",
    nextReview: currentWord.nextReview || "Скоро",
    correctAnswers: currentWord.correctAnswers || 0,
    totalAttempts: currentWord.totalAttempts || 1,
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "hard":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const playPronunciation = () => {
    setIsPlaying(true);
    // Здесь будет логика воспроизведения
    setTimeout(() => setIsPlaying(false), 1000);
  };

  const accuracyPercentage = Math.round(
    (safeWord.correctAnswers / safeWord.totalAttempts) * 100,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="hover:bg-purple-50 border-purple-200"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Icon name="Book" className="text-white" size={20} />
            </div>
            <h1 className="text-lg font-semibold text-gray-800">
              Детали слова
            </h1>
          </div>
        </div>

        {/* Main Word Card */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-4xl font-bold text-gray-800">
                    {safeWord.word}
                  </h2>
                  <Badge className={getDifficultyColor(safeWord.difficulty)}>
                    {safeWord.difficulty}
                  </Badge>
                </div>
                <p className="text-xl text-gray-600 mb-2">
                  {safeWord.translation}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Icon name="Volume2" size={16} />
                    {safeWord.phonetic}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Tag" size={16} />
                    {safeWord.partOfSpeech}
                  </span>
                </div>
              </div>
              <Button
                onClick={playPronunciation}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                disabled={isPlaying}
              >
                <Icon
                  name={isPlaying ? "Loader" : "Volume2"}
                  size={20}
                  className={isPlaying ? "animate-spin mr-2" : "mr-2"}
                />
                {isPlaying ? "Играет..." : "Произнести"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg leading-relaxed">
              {safeWord.definition}
            </p>
          </CardContent>
        </Card>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Icon name="Target" size={24} className="text-purple-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {accuracyPercentage}%
                  </div>
                  <div className="text-sm text-gray-600">Точность</div>
                </div>
              </div>
              <Progress value={accuracyPercentage} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Icon name="BarChart" size={24} className="text-pink-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {safeWord.frequency}
                  </div>
                  <div className="text-sm text-gray-600">Частота</div>
                </div>
              </div>
              <Progress value={safeWord.frequency} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Icon name="Clock" size={24} className="text-orange-500" />
                <div>
                  <div className="text-lg font-bold text-gray-800">
                    {safeWord.nextReview}
                  </div>
                  <div className="text-sm text-gray-600">Следующий повтор</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="examples" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border-purple-200">
            <TabsTrigger
              value="examples"
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              <Icon name="FileText" size={16} className="mr-2" />
              Примеры
            </TabsTrigger>
            <TabsTrigger
              value="synonyms"
              className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
            >
              <Icon name="Link" size={16} className="mr-2" />
              Синонимы
            </TabsTrigger>
            <TabsTrigger
              value="etymology"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              <Icon name="History" size={16} className="mr-2" />
              Этимология
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="examples" className="mt-4">
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" size={20} className="text-purple-500" />
                  Примеры использования
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {safeWord.examples.map((example, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100"
                    >
                      <p className="text-gray-700 italic">"{example}"</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="synonyms" className="mt-4">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Link" size={20} className="text-pink-500" />
                  Синонимы и антонимы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Icon name="Plus" size={16} className="text-green-500" />
                      Синонимы
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {safeWord.synonyms.map((synonym, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-green-50 border-green-200 text-green-800"
                        >
                          {synonym}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Icon name="Minus" size={16} className="text-red-500" />
                      Антонимы
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {safeWord.antonyms.map((antonym, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-red-50 border-red-200 text-red-800"
                        >
                          {antonym}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="etymology" className="mt-4">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="History" size={20} className="text-orange-500" />
                  Этимология
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100">
                  <p className="text-gray-700">{safeWord.etymology}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="mt-4">
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon
                    name="TrendingUp"
                    size={20}
                    className="text-emerald-500"
                  />
                  Статистика изучения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Правильных ответов</span>
                      <span className="font-bold text-emerald-600">
                        {safeWord.correctAnswers}/{safeWord.totalAttempts}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Последний повтор</span>
                      <span className="font-bold text-gray-800">
                        {safeWord.lastReviewed}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Следующий повтор</span>
                      <span className="font-bold text-orange-600">
                        {safeWord.nextReview}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Точность</span>
                        <span className="font-bold text-purple-600">
                          {accuracyPercentage}%
                        </span>
                      </div>
                      <Progress value={accuracyPercentage} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Частота в языке</span>
                        <span className="font-bold text-pink-600">
                          {safeWord.frequency}%
                        </span>
                      </div>
                      <Progress value={safeWord.frequency} className="h-3" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 text-lg">
            <Icon name="Brain" size={20} className="mr-2" />
            Повторить сейчас
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white py-4 text-lg">
            <Icon name="Edit" size={20} className="mr-2" />
            Редактировать
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WordDetail;
