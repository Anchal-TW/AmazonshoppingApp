import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

interface StarRatingProps {
  rating: number;
  starSize?: number;
}

const StarRating: React.FC<StarRatingProps> = ({rating, starSize = 20}) => {
  const renderStars = () => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);

    const stars: React.JSX.Element[] = [];

    const setStarImage = (asset: any) => {
      stars.push(
        <Image
          key={stars.length}
          source={asset}
          style={{width: starSize, height: starSize}}
        />,
      );
    };

    for (let i = 0; i < totalStars; i++) {
      if (i < fullStars) {
        setStarImage(require('../assets/fullStar.png'));
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        setStarImage(require('../assets/halfStar.png'));
      } else {
        setStarImage(require('../assets/emptyStar.png'));
      }
    }

    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StarRating;
