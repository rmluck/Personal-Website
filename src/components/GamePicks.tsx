"use client";

import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

interface GameData {
  game: {
    _id: string;
    homeTeam: {
      _id: string;
      name: string;
      abbreviation: string;
      logo?: any;
      primaryColor?: string;
    };
    awayTeam: {
      _id: string;
      name: string;
      abbreviation?: string;
      logo?: any;
      primaryColor?: string;
    };
    gameDate?: string;
    location?: string;
    homeTeamRank?: number;
    awayTeamRank?: number;
    homeTeamRecord?: string;
    awayTeamRecord?: string;
  };
  spread?: string;
  overUnder?: number;
  straightUpPick?: string;
  spreadPick?: string;
  overUnderPick?: string;
  confidence?: string;
  analysis?: string;
  keyFactors?: string[];
}

interface GamePicksProps {
  data: {
    title: string;
    subtitle?: string;
    sport?: string;
    games: GameData[];
  };
}

export default function GamePicks({ data }: GamePicksProps) {
  const [expandedGames, setExpandedGames] = useState<Set<string>>(new Set());

  const toggleExpand = (gameId: string) => {
    const newExpanded = new Set(expandedGames);
    if (newExpanded.has(gameId)) {
      newExpanded.delete(gameId);
    } else {
      newExpanded.add(gameId);
    }
    setExpandedGames(newExpanded);
  };

  // const getConfidenceColor = (confidence?: string) => {
  //   switch (confidence) {
  //     case 'high':
  //       return 'text-green-600 bg-green-100';
  //     case 'medium':
  //       return 'text-yellow-600 bg-yellow-100';
  //     case 'low':
  //       return 'text-red-600 bg-red-100';
  //     default:
  //       return 'text-gray-600 bg-gray-100';
  //   }
  // };

  const formatGameTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        timeZoneName: 'short'
      })
    };
  };

  // const getPickIndicator = (game: GameData) => {
  //   const picks = [];
    
  //   if (game.straightUpPick) {
  //     const team = game.straightUpPick === 'home' ? game.game.homeTeam : game.game.awayTeam;
  //     picks.push(`SU: ${team.name}`);
  //   }
    
  //   if (game.spreadPick) {
  //     const team = game.spreadPick === 'home' ? game.game.homeTeam : game.game.awayTeam;
  //     picks.push(`ATS: ${team.name}`);
  //   }

  //   if (game.overUnderPick) {
  //     picks.push(`O/U: ${game.overUnderPick.toUpperCase()}`);
  //   }

  //   return picks.length > 0 ? picks.join(' | ') : 'No picks made';
  // };

  const getTeamPickBadges = (game: GameData, teamSide: "home" | "away") => {
    const badges = [];

    if (game.straightUpPick === teamSide) {
      badges.push("SU");
    }

    if (game.spreadPick === teamSide) {
      badges.push("ATS");
    }

    return badges;
  }
  
  return (
    <div className="my-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-pro900 dark:text-pro200 mb-2">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-lg text-pro700 dark:text-pro300 font-medium">
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Games */}
      <div className="space-y-4">
        {data.games?.map((gameData) => {
          const isExpanded = expandedGames.has(gameData.game._id);
          const { date, time } = formatGameTime(gameData.game.gameDate ?? "");

          const homeRank = gameData.game.homeTeamRank;
          const awayRank = gameData.game.awayTeamRank;
          const homeRecord = gameData.game.homeTeamRecord;
          const awayRecord = gameData.game.awayTeamRecord;

          const awayBgColor = gameData.game.awayTeam.primaryColor || "#6B7280";
          const homeBgColor = gameData.game.homeTeam.primaryColor || "#6B7280";

          return (
            <div key={gameData.game._id} className="rounded-lg overflow-hidden shadow-lg">
              {/* Game Row */}
              <div className="flex transition-all duration-200 min-h-[100px] cursor-hover cursor-none"
                   onClick={() => toggleExpand(gameData.game._id)}>
                
                {/* Away Team Side */}
                <div 
                  className="flex-1 flex items-center p-4 text-pro100 relative hover:brightness-105 transition-all duration-200"
                  style={{
                    backgroundColor: awayBgColor,
                  }}
                >
                  {getTeamPickBadges(gameData, "away").length > 0 && (
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center px-4">
                      <div className="flex gap-2">
                        {getTeamPickBadges(gameData, "away").map((badge) => (
                          <span
                            key={badge}
                            className="text-xs font-bold px-2 py-1 rounded-full shadow-md backdrop-blur-xl border-2"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.9)",
                              color: awayBgColor,
                              borderColor: "rgba(255, 255, 255, 1)"
                            }}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center w-full">
                    {/* Away Team Logo */}
                    {gameData.game.awayTeam.logo && (
                      <div className="flex-shrink-0 mr-4 w-16 h-16 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <Image
                            src={urlFor(gameData.game.awayTeam.logo).width(200).url()}
                            alt={`${gameData.game.awayTeam.name} logo`}
                            fill
                            className="object-contain"
                            sizes="64px"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Away Team Info */}
                    <div className="flex-grow text-right">
                      <div className="flex items-center justify-end gap-2 mb-1">
                        {awayRank && (
                          <span className="text-sm font-bold opacity-90">{awayRank}</span>
                        )}
                        <h3 className="text-lg font-bold">{gameData.game.awayTeam.name}</h3>
                      </div>
                      {awayRecord && (
                        <p className="text-sm opacity-90">{awayRecord}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* VS Divider & Game Info */}
                <div className="flex-shrink-0 bg-pro200 dark:bg-pro800 flex flex-col items-center justify-center px-4 w-[140px]">
                  <div className="text-center text-pro900 dark:text-pro200">
                    {/* <div className="font-bold text-lg mb-1">@</div> */}
                    <div className="text-xs mt-2 mb-1">{date}</div>
                    <div className="text-xs mb-1">{time}</div>
                    {gameData.game.location && (
                      <div className="text-xs mb-2 whitespace-normal">{gameData.game.location}</div>
                    )}
                    {gameData.spread && (
                      <div className="text-xs mb-2 font-bold">{gameData.game.homeTeam.abbreviation} {gameData.spread}</div>
                    )}
                  </div>
                </div>

                {/* Home Team Side */}
                <div 
                  className="flex-1 flex items-center p-4 text-pro100 relative hover:brightness-105 transition-all duration-200"
                  style={{
                    backgroundColor: homeBgColor,
                  }}
                >
                  {getTeamPickBadges(gameData, "home").length > 0 && (
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center px-4">
                      <div className="flex gap-2">
                        {getTeamPickBadges(gameData, "home").map((badge) => (
                          <span
                            key={badge}
                            className="text-xs font-bold px-2 py-1 rounded-full shadow-md backdrop-blur-xl border-2"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.9)",
                              color: homeBgColor,
                              borderColor: "rgba(255, 255, 255, 1)"
                            }}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center w-full">
                    {/* Home Team Info */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold">{gameData.game.homeTeam.name}</h3>
                        {homeRank && (
                          <span className="text-sm font-bold opacity-90">{homeRank}</span>
                        )}
                      </div>
                      {homeRecord && (
                        <p className="text-sm opacity-90">{homeRecord}</p>
                      )}
                    </div>
                    
                    {/* Home Team Logo */}
                    {gameData.game.homeTeam.logo && (
                      <div className="flex-shrink-0 ml-4 w-16 h-16 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <Image
                            src={urlFor(gameData.game.homeTeam.logo).width(200).url()}
                            alt={`${gameData.game.homeTeam.name} logo`}
                            fill
                            className="object-contain"
                            sizes="64px"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expand Indicator */}
                <div className="flex-shrink-0 bg-pro200 dark:bg-pro800 flex items-center justify-center px-4 min-w-[55px]">
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-pro700 dark:text-pro300" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-pro700 dark:text-pro300" />
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className={`bg-pro100 dark:bg-pro800 p-6 transform transition-transform duration-300 ease-in-out ${
                  isExpanded ? "translate-y-0" : "-translate-y-4"
                }`}>
                  
                  {/* Picks Summary */}
                  {/* <div className="mb-6 p-4 bg-white dark:bg-pro700 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-pro900 dark:text-pro200 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        My Picks
                      </h4>
                      {gameData.confidence && (
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getConfidenceColor(gameData.confidence)}`}>
                          {gameData.confidence.toUpperCase()} CONFIDENCE
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-pro800 dark:text-pro300 font-medium">
                      {getPickIndicator(gameData)}
                    </p>
                  </div> */}

                  {/* Game Details Grid */}
                  <div className="flex">
                    {/* Analysis */}
                    <div className="flex-1">
                      <div className="text-sm text-pro800 dark:text-pro300 leading-relaxed">
                        <h4 className="font-bold text-pro900 dark:text-pro200 mb-2">Analysis</h4>
                        {gameData.analysis ? (
                          <p className="text-sm text-pro800 dark:text-pro300 leading-relaxed mb-2">
                            {gameData.analysis}
                          </p>
                        ) : (
                          <p className="text-sm text-pro700 dark:text-pro400 italic">No analysis provided.</p>
                        )}
                      </div>
                      
                      {gameData.keyFactors && gameData.keyFactors.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-pro900 dark:text-pro200 mb-2 text-sm">Key Factors:</h5>
                          <ul className="text-xs text-pro700 dark:text-pro400 space-y-1">
                            {gameData.keyFactors.map((factor, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-accent">•</span>
                                <span>{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Game Details */}
                    {/* <div className="space-y-3">
                      {gameData.game.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-pro600 dark:text-pro400" />
                          <span className="text-sm text-pro700 dark:text-pro400">{gameData.game.location}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-pro600 dark:text-pro400" />
                        <span className="text-sm text-pro700 dark:text-pro400">{date} at {time}</span>
                      </div>

                      {gameData.overUnder && (
                        <div>
                          <h5 className="font-semibold text-pro900 dark:text-pro200 mb-1 text-sm">Over/Under</h5>
                          <p className="text-sm text-pro700 dark:text-pro400">{gameData.overUnder} points</p>
                        </div>
                      )}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 -mb-4 border-t border-pro300 dark:border-pro600">
      </div>
    </div>
  );
}