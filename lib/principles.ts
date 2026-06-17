// The point of view, shared between the homepage Approach section (short form)
// and the dedicated /approach page (long form), so the two never drift.
// Voice: declarative, first person plural, no em-dashes. Never the literal
// phrase "we know what right is".

export type Principle = {
  code: string;
  title: string;
  short: string;
  long: string[];
};

export const PRINCIPLES: Principle[] = [
  {
    code: 'P1',
    title: "We don't ship what we wouldn't run.",
    short:
      "BetterCram isn't a portfolio piece. It's a product we own and operate, which means we build for the version of you that has to live with the result.",
    long: [
      'Most studios hand off and leave. Their incentives end at launch, so the decisions that only hurt later get made freely. We are in a different position. We run our own product, so we know what a shortcut costs once you have to live with it, and we will not sell you one.',
      'Building for the person who operates the thing changes every call. The boring error state gets handled. The data model survives its second year. The system degrades gracefully instead of falling over at the worst moment. That is what owning what we ship buys you.',
    ],
  },
  {
    code: 'P2',
    title: 'Right is a standard, not a preference.',
    short:
      "Fast, findable, and obvious to use aren't matters of taste. We know where the bar is, and we don't quietly lower it to hit a date.",
    long: [
      'Fast, findable, and obvious to use are not matters of taste you can argue your way around. There is a bar, it is knowable, and we know where it sits. We do not quietly move it to make a date feel achievable.',
      'This is the part most people mean when they say they want quality and then trade it away under pressure. We write the standard down at the start, so it is not up for renegotiation at the end.',
    ],
  },
  {
    code: 'P3',
    title: 'Taste is a deliverable. So is uptime.',
    short:
      'The way something looks and the way it holds up under load are the same discipline applied at two ends. We refuse to trade one for the other.',
    long: [
      'How a thing looks and how it holds up under load are the same discipline applied at opposite ends. A studio that is good at one and indifferent to the other is only half a studio.',
      'We refuse the trade. The interface earns its keep and the system stays up, because something beautiful that falls over was never shipped, and something reliable that nobody wants to use was not either.',
    ],
  },
  {
    code: 'P4',
    title: 'We say no to the easy version.',
    short:
      "The shortcut that ships fast and ages badly is the most expensive thing you can buy. We'd rather tell you that up front than bill you for it later.",
    long: [
      'The shortcut that ships fast and ages badly is the most expensive thing you can buy. It simply bills you later, in rework, in lost trust, in the rebuild you end up paying for twice.',
      'We would rather say so up front, even when it is not what you want to hear, even when it costs us the easy yes. The job is to get you the right outcome, not the comfortable conversation.',
    ],
  },
];
