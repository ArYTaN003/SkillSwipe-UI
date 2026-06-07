import userService from './userService';
import skillService from './skillService';

const matchService = {
  async findMatches(currentUser, mySkills) {
    const teaches = mySkills.filter((s) => s.type === 'TEACH').map((s) => s.skill.skillId);
    const learns = mySkills.filter((s) => s.type === 'LEARN').map((s) => s.skill.skillId);

    const allSkills = await skillService.getAll();
    const candidates = [];

    for (const skill of allSkills) {
      if (learns.includes(skill.skillId)) {
        const results = await userService.search('');
        candidates.push(...results);
      }
    }

    const seen = new Set();
    return candidates.filter((u) => {
      if (u.userId === currentUser.userId || seen.has(u.userId)) return false;
      seen.add(u.userId);
      return true;
    });
  },

  async searchMatches(name) {
    return userService.search(name);
  },
};

export default matchService;
