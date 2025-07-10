module.exports = function tryGetMainTextChannel(guild) {
    const channel = guild.channels.cache.find(c =>
      c.isTextBased() &&
      ['general', 'global', 'main', 'gen-chat', 'general-chat'].includes(c.name.toLowerCase()) &&
      c.viewable &&
      c.permissionsFor(guild.members.me).has('SendMessages')
    );

    if (channel) return channel;

    return guild.channels.cache
      .filter(c =>
        c.isTextBased() &&
        c.viewable &&
        c.permissionsFor(guild.members.me).has('SendMessages')
      )
      .sort((a, b) => a.position - b.position)
      .first();

      
  };

