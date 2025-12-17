exports.getRewardStatus = (reward, user) => {
    const stats = user.stats;

    switch (reward.requirementType) {
        case "7_day_streak":
            return stats.streakDays >= 7 ? "completed" :
                stats.streakDays > 0 ? "in-progress" : "not-started";

        case "first_journal":
            return stats.journalCount >= 1 ? "completed" : "not-started";

        case "habit_master":
            return stats.habitStreaks >= 14 ? "completed" :
                stats.habitStreaks > 0 ? "in-progress" : "not-started";

        case "community_contributor":
            return stats.communityPosts >= 10 ? "completed" :
                stats.communityPosts > 0 ? "in-progress" : "not-started";

        case "30_day_streak":
            return stats.streakDays >= 30 ? "completed" :
                stats.streakDays > 0 ? "in-progress" : "not-started";

        case "community_star":
            return stats.likesReceived >= 50 ? "completed" :
                stats.likesReceived > 0 ? "in-progress" : "not-started";

        default:
            return "not-started";
    }
};
