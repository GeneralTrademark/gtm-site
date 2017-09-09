import React from 'react'
import TypistCycle from './type';

const Update = (props) => {

  return (
    <section
      className={props.openQuestion ? 'update open' : 'update'}
      onClick={props.handleOnclick}
      onMouseOver={props.handlePlayMessages}
      onTouchStart={props.handlePlayMessages}>

      <div className='icon'>{props.openQuestion ? '⤴' : '◡'}</div> <span className='text'>{props.openQuestion ? 'back up' : ''}</span>

      {props.startMessages ?
        <TypistCycle
          content={[
            'Thanks for visiting',
            'Just so you know...',
            'We are currently looking for work...',
            'Have something we can help with?',
            <a href='mailto:info@generaltrademark.com'>Get in touch ↗</a>,
            'Also...',
            <span>We just made some updates to <a href='https://arenatv.now.sh/?ch=herzog'>arenaTV ↗</a></span>,
            'Lastly...',
            'We are probably in studio right now watching our plants grow',
            'Come hang out w/us!',
            'See you soon'
          ]}
          numberOfCycles={1}
          segmentDelay={2} // stop for 0.8s at end line
          avgTypingDelay={30}
          stdTypingDelay={10}
          cursor={{ hideWhenDone: false }}
        />
        :
        <span>{props.activeImage ? props.message : 'Welcome to this webpage!'}</span>
       }
    </section>
  )
}

export default Update
